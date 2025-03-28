from setuptools import setup, find_packages  # type: ignore
import os

VERSION = "1.0.0"


def parse_requirements(filename):
    with open(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), filename),
        encoding="utf-8",
        mode="r",
    ) as file:
        return [
            line.strip() for line in file if line.strip() and not line.startswith("#")
        ]

setup(
    name="lighthouse",
    license="BSD-3",
    version=VERSION,
    packages=find_packages(),
    entry_points={
        "console_scripts": [
            "lighthouse=lighthouse.cli:cli",
        ],
    },
    install_requires=parse_requirements("requirements.txt"),
    extras_require={
        "dev": parse_requirements("requirements.dev.txt"),
    },
    python_requires=">=3.11",
)
