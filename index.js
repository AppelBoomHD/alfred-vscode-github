// Import necessary modules
const { readdirSync, existsSync } = require("fs");
const { join } = require("path");

// Get environment variables
const PROJECT_DIR = process.env.PROJECT_DIR;
const INC_SUBDIRS = !!+process.env.INC_SUBDIRS;
const WITH_GITFILE = !!+process.env.WITH_GITFILE; // New variable for checking .git files
const action = process.argv[2];

// Function to get directories in a given path
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Function to check if a directory contains a ".git" subdirectory
const isGitRepo = (dir) => {
  if (action === "open" && WITH_GITFILE) {
    const gitPath = join(PROJECT_DIR, dir, ".git");
    return existsSync(gitPath) && readdirSync(gitPath).length > 0;
  } else {
    return true; // Always include the directory for new projects or when WITH_GITFILE is not checked
  }
};

// Function to create an item object
const createItem = (title, subtitle, arg) => ({ title, subtitle, arg });

// Array to store items
const items = [];

// Check the action and perform corresponding actions
if (action === "new") {
  // Create items for new projects
  if (INC_SUBDIRS) {
    getDirectories(PROJECT_DIR).forEach((dir) => {
      if (isGitRepo(dir)) {
        items.push(
          createItem(dir, `Create project in directory: \`${dir}\``, `${PROJECT_DIR}/${dir}`)
        );
      }
    });
  } else {
    if (isGitRepo("")) {
      items.push(
        createItem("New Project", `Create project in directory: \`${PROJECT_DIR}\``, PROJECT_DIR)
      );
    }
  }
} else if (action === "open") {
  // Process projects for opening
  const processDirs = (dir, project) => {
    const fullPath = `${PROJECT_DIR}/${dir}/${project}`;
    if (isGitRepo(`${dir}/${project}`)) {
      items.push(
        createItem(project, `Open project \`${project}\` from directory \`${dir}\``, fullPath)
      );
    }
  };

  // Check whether to include subdirectories
  if (INC_SUBDIRS) {
    getDirectories(PROJECT_DIR).forEach((dir) => {
      getDirectories(`${PROJECT_DIR}/${dir}`).forEach((project) =>
        processDirs(dir, project)
      );
    });
  } else {
    getDirectories(PROJECT_DIR).forEach((project) => processDirs("", project));
  }
}

// Output items as JSON
console.log(JSON.stringify({ items }, null, "\t"));
