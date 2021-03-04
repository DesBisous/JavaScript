function test1() {
    console.log(this, arguments);
    console.log(test1.caller)
}
function test2() {
    test1()
}
test2()