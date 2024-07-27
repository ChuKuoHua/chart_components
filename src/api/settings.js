import { service } from '@/utils/service.js'

export function getWebSettingsApi () {
  return service({
    method: 'GET',
    url: '/api/v1/settings'
  })
}

export function getGroupsApi () {
  return service({
    method: 'GET',
    url: '/api/v1/groups'
  })
}
