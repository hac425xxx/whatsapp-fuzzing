// //设置异常
// Process.setExceptionHandler(function (details) {

//     console.log(details.context)
//     console.log(details.type)
//     console.log(details.address)
//     return false;
// });

// function afl_maybe_log(context) {
//     console.log(context.pc)
// }

// var generic_transform = function (iterator) {

//     var i = iterator.next();
//     iterator.putCallout(afl_maybe_log);

//     do iterator.keep()
//     while ((i = iterator.next()) !== null);

// }

setImmediate(function () {
    Java.perform(function () {


        var Java_com_whatsapp_Mp4Ops_mp4check_addr = Module.findExportByName('libwhatsapp.so', 'Java_com_whatsapp_Mp4Ops_mp4check');
        console.log("Java_com_whatsapp_Mp4Ops_mp4check_addr: " + Java_com_whatsapp_Mp4Ops_mp4check_addr);

        var target_addr = Java_com_whatsapp_Mp4Ops_mp4check_addr.add(0x2e23c);
        console.log("target_addr: " + target_addr);

        var Java_com_whatsapp_Mp4Ops_mp4check = new NativeFunction(Java_com_whatsapp_Mp4Ops_mp4check_addr, "int", ['pointer', 'pointer', 'pointer', 'int']);
        var env = Java.vm.getEnv();
        var mp4_path = env.newStringUtf("/storage/emulated/legacy/Download/poc.mp4");
        // mp4_path = Memory.allocUtf8String("/data/local/tmp/init.mp4");

        Interceptor.attach(Java_com_whatsapp_Mp4Ops_mp4check_addr, {
            onEnter: function (args) {
                console.log("in Java_com_whatsapp_Mp4Ops_mp4check");
            },
            onLeave: function (retval) {
            }
        });


        Interceptor.attach(target_addr, {
            onEnter: function (args) {
                console.log("in target");
                console.log("a1: " + args[0].readCString());
                console.log("a2: " + args[1]);

            },
            onLeave: function (retval) {
                console.log("out target");
            }
        });

        var Mp4Ops = Java.use('com.whatsapp.Mp4Ops');
        var Mp4Ops_handle = Mp4Ops.$getClassHandle(env);


        var ret = Java_com_whatsapp_Mp4Ops_mp4check(ptr(env.handle), ptr(Mp4Ops_handle), ptr(mp4_path), 1);
        console.log("ret: " + ret);
    });
});