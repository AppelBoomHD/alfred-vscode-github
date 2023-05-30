const { readdirSync } = require("fs");

const PROJECT_DIR = process.env.PROJECT_DIR;
const INC_SUBDIRS = !!+process.env.INC_SUBDIRS;
const action = process.argv[2];

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const dirs = getDirectories(PROJECT_DIR);

const items = [];
if (action === "new") {
  if (INC_SUBDIRS) {
    dirs.forEach((dir) => {
      items.push({
        title: dir,
        subtitle: `Create project in directory: \`${dir}\``,
        arg: `${PROJECT_DIR}/${dir}`,
      });
    });
  } else {
    items.push({
      title: "New Project",
      subtitle: `Create project in directory: \`${PROJECT_DIR}\``,
      arg: `${PROJECT_DIR}`,
    });
  }
} else if (action === "open") {
  if (INC_SUBDIRS) {
    dirs.forEach((dir) => {
      getDirectories(`${PROJECT_DIR}/${dir}`).forEach((project) => {
        items.push({
          title: project,
          subtitle: `Open project \`${project}\` from directory \`${dir}\``,
          arg: `${PROJECT_DIR}/${dir}/${project}`,
        });
      });
    });
  } else {
    dirs.forEach((project) => {
      items.push({
        title: project,
        subtitle: `Open project \`${project}\``,
        arg: `${PROJECT_DIR}/${project}`,
      });
    });
  }
}

console.log(JSON.stringify({ items }, null, "\t"));
