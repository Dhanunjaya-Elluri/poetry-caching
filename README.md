# Poetry and Docker Caching in Github Actions

This is a simple example of how to use poetry to cache dependencies in a CI/CD pipeline.

## Setup for poetry

1. Install poetry
    ```bash
    pip install poetry
    ```

2. Set up poetry configuration
    ```bash
    poetry config virtualenvs.create true
    poetry config virtualenvs.in-project true
    poetry install
    ```

3. Set up pre-commit with poetry
    ```bash
    poetry add -G dev pre-commit
    poetry install --with dev
    ```

4. Create .pre-commit-config.yaml

    See [pre-commit-config.yaml](.pre-commit-config.yaml)

5. Install pre-commit hooks
    ```bash
    git add .pre-commit-config.yaml
    poetry run pre-commit install
    ```

Now, whenever you do git commit ..., it will run the poetry run python -m black ... command like this:

 ```bash
 git commit -m "Test commit"
 ```

 ```bash
 Sync with Poetry.....................................(no files to check)Skipped
 Trim Trailing Whitespace.................................................Passed
 Fix End of Files.........................................................Passed
 Check Yaml...............................................................Passed
 Check for added large files..............................................Passed
 Check for merge conflicts................................................Passed
 Check JSON...........................................(no files to check)Skipped
 Check Toml...........................................(no files to check)Skipped
 black................................................(no files to check)Skipped
 isort................................................(no files to check)Skipped
 ruff.................................................(no files to check)Skipped
 [master 6d15ea8] feat: flask-app/.venv in CI
  1 file changed, 1 insertion(+)
 ```
