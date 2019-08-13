import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import uuidv4 from 'uuid/v4'

import { ADD_CAR, GET_CARLIST } from '../queries'

import { Button, TextField, Select, MenuItem } from '@material-ui/core'

class AddCar extends Component {
  state = {
    year: '',
    make: '',
    model: '',
    price: '',
    ownerId: '',
  }

  render() {
    const { year, make, model, price, ownerId } = this.state
    const id = uuidv4()
    return (
      <Mutation
        mutation={ADD_CAR}
        update={(store, { data: { addCar } }) => {
          const { carlist } = store.readQuery({ query: GET_CARLIST })
          store.writeQuery({
            query: GET_CARLIST,
            data: { carlist: carlist.concat([addCar])}
          })
        }}
      >
        {(addCar, { data, loading, error }) => (
          <form onSubmit={e => {
            e.preventDefault()
            addCar({
              variables: {
                id,
                year,
                make,
                model,
                price,
                ownerId
              },
              optimisticResponse: {
                __typename: 'Mutation',
                addCar: {
                  __typename: 'Car',
                  id,
                  year,
                  make,
                  model,
                  price,
                  ownerId
                }
              }
            })
          }}>
            <TextField
              label='Year'
              value={year}
              placeholder='i.e. 2018'
              onChange={e => this.setState({ year: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Make'
              value={make}
              placeholder='i.e. Toyota'
              onChange={e => this.setState({ make: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Model'
              value={model}
              placeholder='i.e. Supra'
              onChange={e => this.setState({ model: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Price'
              value={price}
              placeholder='i.e. 500000'
              onChange={e => this.setState({ price: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <Select
              label='Owner'
              value={ownerId}
              onChange={e => this.setState({ ownerId: e.target.value })}
              margin='normal'
              style={{ margin: '5px' }}
            >
              <MenuItem value={'1'}>Steve Jobs</MenuItem>
              <MenuItem value={'2'}>Elon Musk</MenuItem>
              <MenuItem value={'3'}>Jeff Bezos</MenuItem>
            </Select>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: '5px' }}
            >
              Add Car
            </Button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default AddCar