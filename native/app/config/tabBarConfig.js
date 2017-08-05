import baseConfig from './baseConfig'

const tabBarConfig = {
    items: [
        {
            id: 'shop',
            title: 'Shop',
            imageUrl: 'file:///wand.png',
            selectedImageUrl: 'file:///wand_selected.png',
            rootUrl: `${baseConfig.baseURL}`,
            isInitialTab: true
        },
        {
            id: 'stores',
            title: 'Stores',
            imageUrl: 'file:///map.png',
            selectedImageUrl: 'file:///map_selected.png',
            rootUrl: `${baseConfig.baseURL}`
        },
        {
            id: 'account',
            title: 'Account',
            imageUrl: 'file:///user.png',
            selectedImageUrl: 'file:///user_selected.png',
            rootUrl: `${baseConfig.baseURL}/customer/account`,
            type: 'custom'
        },
        {
            id: 'more',
            title: 'More',
            imageUrl: 'file:///more.png',
            selectedImageUrl: 'file:///more_selected.png',
            rootUrl: `${baseConfig.baseURL}`
        }
    ]
}

const getInitialTabId = function() {
    const initialTabItem = tabBarConfig.items.find((item) => {
        return typeof item.isInitialTab === 'boolean' && item.isInitialTab
    })

    if (initialTabItem) {
        return initialTabItem.id
    }

    return undefined
}

export {tabBarConfig, getInitialTabId}
