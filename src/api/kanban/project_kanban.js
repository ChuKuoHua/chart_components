import { service } from '@/utils/service.js'

export function getKanBanEngDataApi ({
  woSn,
  matCodename,
  beginMonth,
  endMonth
}) {
  return service({
    method: 'GET',
    url: '/api/v1/dashboard/eng-data',
    params: {
      wo_sn: woSn,
      mat_codename: matCodename,
      begin_month: beginMonth,
      end_month: endMonth
    }
  })
}

export function getKanBanQueryDueWoApi ({
  dueDate
}) {
  return service({
    method: 'GET',
    url: '/api/v1/dashboard/eng-data/query-due-wo',
    params: {
      due_date: dueDate
    }
  })
}
