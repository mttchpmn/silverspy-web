import {EditableTable} from "./EditableTable";

export function PaymentsTable() {
    const onRowUpdate = () => Promise.resolve(true);
    const transactionData = null

    return <div>
        <EditableTable inputData={transactionData} onRowUpdate={onRowUpdate}/>
    </div>
}