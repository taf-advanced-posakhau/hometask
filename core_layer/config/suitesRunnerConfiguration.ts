export const suitesRunnerConfig = {
    main: [
        './test_layer/**/*.feature'
    ], 
    hometask04: [
        './test_layer/features/ht-04-bdd/*.feature'
    ],
    hometask06: [
        './test_layer/features/ht-06-ui/*.feature'
    ],
    smoke: [
        'test_layer/features/smoke_test.feature'
    ]
}

module.exports = {
    suitesRunnerConfig
}