import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {connect} from 'react-redux';
import {getTtokenPaiement,validatePayment} from '../api/stripeApi';
import {View,Text, TouchableOpacity} from 'react-native'

class CheckoutForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        
      }
    }
    
    handleSubmit = async (e)=>{
      e.preventDefault()

      let data = {
        email: this.props.user.infos.email
      }
    //   let paymentIntent = await getTtokenPaiement(data);
    //   console.log(paymentIntent);
    //   const token_secret = paymentIntent.client_secret;
      const payment = await this.props.stripe.confirmCardPayment(token_secret, {
                                                                      payment_method: {
                                                                        card: this.props.elements.getElement(CardElement),
                                                                        billing_details: {
                                                                          email: this.props.user.infos.email
                                                                        },
                                                                      }
                                                                  })
      console.log(payment);
      if(payment.error) {
        console.log('c\'est mort', payment.error.message)
      } else {
        if (payment.paymentIntent.status === 'succeeded') {
          console.log('Money is in the bank!');
          let data = {
            orderId: this.props.orderId,
            status: "payed"
          }
          validatePayment(data)
            .then((res)=>{
              console.log(res);

              this.props.basket.products.map((beer)=>{
                let data ={
                  quantity: beer.quantity
                }
                
                modifyQuantityProduct(beer.beer.id, data)
                  .then((res)=>{
                    console.log(res);
                    this.setState({redirect: true})
                  })
              })
              
            })
        }
      }
      
    }
    
    render() {
        //console.log(this.props.stripe)
        // if(this.state.redirect) {
        //   return <Redirect to="/success" />
        // }
        const {stripe} = this.props;
        return (
            <View>
          
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <TouchableOpacity type="submit" disabled={!stripe}>
              <Text>Pay</Text>
            </TouchableOpacity>
            </View>
        );
      }

}



const mapStateToProps = (store) => {
  return {
      user: store.user
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);