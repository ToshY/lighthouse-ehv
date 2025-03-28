import os
from pathlib import Path

import aiohttp
import asyncio
import aiofiles
import json

import click
from loguru import logger

BASE_URL = "https://api.presendoo.app/api/public/projects/51/units"

async def fetch_units():
    units = []
    page = 1
    async with aiohttp.ClientSession() as session:
        while True:
            async with session.get(f"{BASE_URL}?take=50&page={page}") as resp:
                data = await resp.json()
                if not data["result"]:
                    break
                units.extend(data["result"])
                page += 1
    return units


async def fetch_unit_details(session, unit_id):
    async with session.get(f"{BASE_URL}/{unit_id}") as resp:
        return await resp.json()


async def cli():
    output_directory = Path(click.format_filename(os.getenv("DATA_DIRECTORY", "/data")))

    units = await fetch_units()
    unit_ids = [unit["id"] for unit in units]

    details = []
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_unit_details(session, unit_id) for unit_id in unit_ids]
        details = await asyncio.gather(*tasks)

    cleaned_data = [item["result"] for item in details if "result" in item]

    output_file = output_directory.joinpath("units.json")
    async with aiofiles.open(output_file, "w") as f:
        await f.write(json.dumps(cleaned_data, indent=2))

    logger.info(f"Saved {len(details)} unit details to `{str(output_file)}`.")
