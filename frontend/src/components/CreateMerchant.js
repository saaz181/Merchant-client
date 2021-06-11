import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MerchantPage from './MerchantPage';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root1: {
    width: '100%'
  },
  backButton1: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  instructions1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  StepButtons: {
      position: 'absolute',
    marginTop: 25,
    marginLeft: '70%'
  },
  nextButton1: {
    marginTop: theme.spacing(1),
  
}, 
buttons: {

}

}));


function getSteps() {
  return ["company's name", 'Main Info', 'Location', 'Credit Card', 'Logo', 'Confirm'];
}



export default function HorizontalLabelPositionBelowStepper(props) {
  
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <MerchantPage part='company-name' />;
            case 1:
                return <MerchantPage part='first-name' />;
            
            case 2:
                return <MerchantPage part='location' />;
            
            case 3:
                return <MerchantPage part='credit' />;

            case 4:
              return <MerchantPage part='logo' />;

            case 5:
                    return <MerchantPage />;
                
            default:
                return 'Unknown stepIndex';
        }
    }
    
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
     
};

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
  };

  const handleReset = () => {
    setActiveStep(0);
    
    
  };
  

  return (
    <div className={classes.root1}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions1}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions1}>{getStepContent(activeStep)}</Typography>
            <div className={classes.StepButtons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton1}
              >
                Back
              </Button>
              
                {activeStep === steps.length - 1 
                ? null : 
                <Button variant="contained" 
                        color="primary" 
                        onClick={handleNext} 
                        className={classes.nextButton1}>
                        Next
                        </Button>}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
