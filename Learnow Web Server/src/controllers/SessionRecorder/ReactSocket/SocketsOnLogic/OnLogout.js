export const onLogout = (userConfigs, email) => {
    userConfigs.forEach((userConfig, index) => {
        if (userConfig.userEmail === email) {
            userConfigs.splice(index, 1)
        }
    })
}