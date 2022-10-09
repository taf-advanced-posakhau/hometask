export class TestSuitePage {
    public getLaunchesTableHeaderElement  = async ( value : string ) => {
        return $(`//span[text()='${value}']`);
    }
}