import os

# Folders/files to ignore
IGNORE = {
    "node_modules",
    ".git",
    "__pycache__",
    ".next",
    "dist",
    "build"
}

def print_tree(path=".", prefix=""):
    items = [item for item in sorted(os.listdir(path)) if item not in IGNORE]

    for index, item in enumerate(items):
        full_path = os.path.join(path, item)
        connector = "└── " if index == len(items) - 1 else "├── "

        print(prefix + connector + item)

        if os.path.isdir(full_path):
            extension = "    " if index == len(items) - 1 else "│   "
            print_tree(full_path, prefix + extension)

# Run
print_tree(".")