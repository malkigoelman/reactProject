import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {GridColumn,FormInput,Button,Divider,Form,Grid,Segment,} from 'semantic-ui-react'
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required(),
        Name: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.number().positive().integer().min(7).required(),
        Tz: yup.number().positive().integer().min(8)
    })
const SiginTest = () => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <GridColumn>
        <Form>
          <FormInput
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Name'
            type='Name'
          />
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Email'
            type='Email'
          />
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Phone'
            type='Phone'
          />
          

          <Button content='Login' primary />
        </Form>
      </GridColumn>

      <GridColumn verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </GridColumn>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
)

export default SiginTest;