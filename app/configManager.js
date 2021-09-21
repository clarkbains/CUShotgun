
let fconfig;
try{
    fconfig = require("./config")
} catch {
    fconfig = null
}

function getConfig(path){
    if (typeof path === "string"){
        path = path.split(".")
    }
    if (fconfig){
        let currentConfig = fconfig;
        for (let pathElm of path){
            currentConfig = currentConfig[pathElm]
            if (currentConfig == undefined){
                console.warn(`Could not find config for key: ${path}`)
                break;
            }
        }
        return currentConfig
    } 
    let key = path.join("_").toUpperCase()
    console.log(`Failed to find key ${path.join(".")} in config file, checking env for ${key}`)
    let envVal = process.env[key]
    return envVal
}

module.exports = {
    contact: {
        auth: {
            user: getConfig("contact.auth.user"),
            pass: getConfig("contact.auth.pass")
        },
        from: getConfig("contact.from"),
        to: getConfig("contact.to")
    }
}
