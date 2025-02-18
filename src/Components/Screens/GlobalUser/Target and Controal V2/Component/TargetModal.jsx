import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label
} from 'reactstrap';

const TargetModal = ({ 
  isOpen, 
  toggle, 
  areaId, 
  currentAlerts = 0,
  onSave 
}) => {
  const [selectedTarget, setSelectedTarget] = useState('20');
  
  const targetOptions = [
    '10', '15', '20', '25', '30', '35', 
    '40', '50', '60', '70', '80', '90', '100'
  ];

  const calculateNewTarget = (reduction) => {
    if (!currentAlerts || currentAlerts <= 0) {
      console.error("Invalid currentAlerts value:", currentAlerts);
      return "N/A"; // Return a default value or handle this case appropriately
    }
  
    // Parse and validate the reduction value
    const percentage = parseFloat(reduction) / 100;
    if (isNaN(percentage) || percentage <= 0 || percentage > 1) {
      console.error("Invalid reduction percentage:", reduction);
      return "N/A"; // Return a default value or handle this case appropriately
    }
  
    // Calculate the new target
    const reductionAmount = currentAlerts * percentage;
  
    // Ensure the reduction doesn't result in negative or invalid targets
    const newTarget = Math.max(0, Math.round(currentAlerts - reductionAmount));
  
    console.log(`Reduction: ${reduction}%`);
    console.log(`Current Alerts: ${currentAlerts}`);
    console.log(`Reduction Amount: ${reductionAmount}`);
    console.log(`New Target: ${newTarget}`);
  
    return newTarget;
  };
  
  const handleSave = async () => {
    const newTarget = calculateNewTarget(selectedTarget);
    
    try {
      const payload = {
        factory_id: 14,
        user_id: 89,
        week: "2025-W01",
        area_id: areaId,
        target: newTarget,
      };

      await onSave(payload);
      toggle();
    } catch (error) {
      console.error("Error saving target:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>
        Update Target (Week 1)
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="targetSelect">Target</Label>
          <Input
            type="select"
            id="targetSelect"
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="mb-3"
          >
            {targetOptions.map((option) => (
              <option key={option} value={option}>
                {option}%
              </option>
            ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TargetModal;