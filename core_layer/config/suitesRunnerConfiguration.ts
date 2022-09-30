export const suitesRunnerConfig = {
    main: [
        './test_layer/**/*.feature'
    ], 
    smoke: [
        'test_layer/features/smoke_test.feature'
    ]
}

module.exports = {
    suitesRunnerConfig
}