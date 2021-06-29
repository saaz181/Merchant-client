import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CategorySelect() {
  const classes = useStyles();
  const [category, setCategory] = React.useState({
    category: []
});

  React.useEffect(() => {
    axios.get('/api/category')
    .then(response => {
    setCategory({
        ...category,
        category: response.data
        });
    })
}, [])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          
          
        </Select>
      </FormControl>
    </div>
  );
}
