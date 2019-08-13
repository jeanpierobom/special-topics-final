import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core'
import { GET_OWNERLIST, REMOVE_OWNER } from '../queries'
import { filter } from 'lodash'

const RemoveOwner = ({ id, firstname, lastname }) => {
  return (
    <Mutation
      mutation={REMOVE_OWNER}
      update={(store, { data: { removeOwner } }) => {
        const { ownerlist } = store.readQuery({ query: GET_OWNERLIST })
        store.writeQuery({
          query: GET_OWNERLIST,
          data: { ownerlist: filter(ownerlist, o => { return o.id !== removeOwner.id }) }
        })
      }}
    >
      {removeOwner => (
        <Button onClick={e => {
          e.preventDefault()
          removeOwner({
            variables: {
              id
            },
            optimisticResponse: {
              __typename: 'Mutation',
              removeOwner: {
                __typename: 'Owner',
                id,
                firstname,
                lastname
              }
            }
          })
        }}
          variant='contained'
          color='secondary'
          style={{ margin: '5px' }}
        >
          Delete
        </Button>
      )}
    </Mutation>
  )
}

export default RemoveOwner