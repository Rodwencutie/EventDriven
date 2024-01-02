
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './reserve.module.css';


const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  
  const [selectedItemsContainer, setSelectedItemsContainer] = useState([]);

  useEffect(() => {
    // Fetch menu items from MySQL database using Axios
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
  
    fetchMenuItems();
  }, []);
  

  const initialValues = {
    name: '',
    email: '',
    contact: '',
    selectedMenuItems: [],
    eventType: '',
    date: '',
    eventTime:'',
    venue: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().required('Select at least one menu item'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime:Yup.string().required('Required'),
    venue:Yup.string().required('Required'),
  });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        // Make a POST request to save the reservation data
        const response = await axios.post('http://localhost:8081/Customers_Order', {
          name: values.name,
          email: values.email,
          contact: values.contact,
          venue: values.venue,
          selectedMenuItems: values.selectedMenuItems.join(', '),
          eventType: values.eventType,
          date: values.date,
          eventTime: values.eventTime,
        });

        console.log(response.data); // Assuming the server returns some response, you can log it for debugging

        // Update the selected items container
        setSelectedItemsContainer(values.selectedMenuItems);

        // Reset the form after successful submission
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error('Error submitting reservation:', error);
        console.log('Reservation not saved!');
        // Handle errors or display an error message to the user
        // You might want to update the UI to inform the user about the error
      }
    };


    



  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact">Contact</label>
          <Field type="text" id="contact" name="contact" />
          <ErrorMessage name="contact" component="div" />
        </div>

        <div>
        <label htmlFor="venue">Venue</label>
        <Field type="text" id="venue" name="venue" />
        <ErrorMessage name="venue" component="div" />
        </div>


        <div>
          <label htmlFor="selectedMenuItems">Menu Items</label>
          <Field as="select" multiple name="selectedMenuItems">
            {menuItems.map(item => (
              <option key={item.Food} value={item.Food}>
                {item.Food}
              </option>
            ))}
          </Field>
          <ErrorMessage name="selectedMenuItems" component="div" />
        </div>




        <div>
          <label htmlFor="eventType">Event Type</label>
          <Field as="select" id="eventType" name="eventType">
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="homecoming">Homecoming</option>

          </Field>
          <ErrorMessage name="eventType" component="div" />
        </div>
       





        <div>
          <label htmlFor="date">Date</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
        <label htmlFor="eventTime">Event Time</label>
        <Field type="time" id="eventTime" name="eventTime" />
        <ErrorMessage name="eventTime" component="div" />
        </div>
        
        <div className="selected-items-container">
          <p>Selected Items:</p>
          <ul>
            {selectedItemsContainer.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>



        <div>
          <button type="submit">Place Reservation</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;
