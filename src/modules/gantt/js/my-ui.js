/**
 * Crea la lista dei tasks da mostrare per mostrare il dettaglio del task indicato
 * @param {Object} task : task di cui mostrare i dettagli
 * @returns {Array} : lista di array con task semplici da mostrare in ui
 */
export function creaListaTaskDetailUi(task) {
    let result = [];
    let listaTasks = [];
    listaTasks.push(task);

    // console.log('Loop sub tasks');
    task.subTasks.forEach(item => {
        listaTasks.push(item);
    });

    listaTasks.forEach(task => {
        let label = task.txtMacchina + '-' + task.stallo;
        let totalDays = 0;
        let numTasks = 0;
        let workloads = [];

        task.details.workload.forEach(item => {
            workloads.push({
                days: item.days,
                idRequest: item.idRequest,
                msg: `Test request : ${item.idRequest} - Durata ${item.days} giorni`
            });
            totalDays += item.days;
            numTasks++;
        });

        let msg = `${label} occupato per ${totalDays} giorni`;
        let obj = {
            msg: msg,
            totalDays: totalDays,
            numTasks: numTasks,
            label: label,
            workloads: workloads
        };

        result.push(obj);
    });
    return result;
}
