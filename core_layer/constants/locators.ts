export const REPORTPORTAL_LOCATORS = {
    login : {
        username: `//input[@name='login']`,
        password: `//input[@name='password']`,
        loginButton: `//button[text()='Login']`
    },
    dashboard: {
        draggableElement: `//div[text()='draggable_021']/parent::div/parent::div`,
        targetElement: `//div[@class='react-grid-layout']`,
        resizeableWidgetPointer: `//div[text()='draggable_021']/parent::div/parent::div/parent::div/parent::div/parent::div/following-sibling::span`,
        movableWidget: `//div[text()='api_filter_419']/parent::div/parent::div/parent::div/parent::div/parent::div/parent::div`,
        sizeableContentElement: `//div[contains(@class,'widget-wrapper')]`
    },
    
}

