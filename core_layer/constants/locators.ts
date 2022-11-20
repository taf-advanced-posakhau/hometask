export const REPORTPORTAL_LOCATORS = {
    login : {
        username: `//input[@name='login']`,
        password: `//input[@name='password']`,
        loginButton: `//button[text()='Login']`
    },
    dashboard: {
        draggableElement: `//div[text()='draggable_468']/parent::div/parent::div`,
        targetElement: `//div[@class='react-grid-layout']`
    }
}

