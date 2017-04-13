const cluster = require('cluster');
const os = require('os');

//first time executing this file we will be using the Master process
if (cluster.isMaster) { //will be true first time run
    const cpus = os.cpus().length; //amount of CPUs

    console.log(`Forking for ${cpus} CPUS`)

    for (let i = 0; i<cpus; i++ ) {
        cluster.fork(); //create as many workers as many cpus in the system to take advantage of all processing power
    }
//run again after with worker mode not master process
}else {
    require('./server.js');
}

cluster.on('exit', function(worker, code, signal) {
    console.log(`Worker %d died with code/signal %s. Restarting worker... `, worker.process.pid, signal || code);
    cluster.fork();
});