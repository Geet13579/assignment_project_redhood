import { useEffect } from "react"
import { useSmsStore } from '@/hooks/active-task/use-history-list'
import TablePage from './history-list'

const tableHeading = [
  "Date",
  "Time",
  "Action",
  "Action By"

]

function OverviewPage({tasks}:any) {

  const { licenses, fetchLicenses } = useSmsStore()
  // const { fetchTaskList, tasks } = useTaskStore();

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  return (
    <div>
      <div className='bg-white p-5  border-[1.5px] border-borderColor mt-5 mb-10'>

        <TablePage licenses={tasks} tableHeading={tableHeading}/>
      </div>
    </div>
  )
}

export default OverviewPage


