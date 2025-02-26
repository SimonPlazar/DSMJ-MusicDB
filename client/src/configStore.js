let isInitialized = false
let configStore = {
    title: null,
    theme: null,
    filtersPath: null,
    filters: null,
    shownGenres: null,
    shownAttributes: null,
    routes: null,
}

export function setConfig(newConfig) {
    if (isInitialized) {
        console.warn("Config store already initialized")
    }

    configStore = { ...newConfig }
    console.log("Setting configStore: ", configStore)
    isInitialized = true
}

export function getConfig() {
    if (!isInitialized) {
        console.warn("Config store accessed before initialization")
    }
    console.log("Reading configStore: ", configStore)
    return configStore
}