const Packager = require('@turbowarp/packager');
const fs = require('fs');
const packager = new Packager.Packager();
async function pkgr(fdt,name){
    projectData=fdt;
    const progressCallback = (type, a, b) => {};
    const loadedProject = await Packager.loadProject(projectData, progressCallback);
    packager.project = loadedProject;
    packager.options.app.windowTitle=name;
    const result = packager.package();
    return result.data;
}