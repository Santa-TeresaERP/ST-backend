import Resource from '@models/resource'

const serviceGetResources = async () => {
  const resources = await Resource.findAll()
  return resources
}

export default serviceGetResources
