export const onGetUserConfiguration = (soc, userConfigs, email) => {
    userConfigs.forEach(userConfig => {
        if (userConfig.userEmail === email) {
            soc.emit('configuration', userConfig.config)
        }
    })
}