import React from 'react';

import { NavigationContainer,useIsFocused  } from '@react-navigation/native';

export function FetchUserData({ onUpdate }) {
    const isFocused = useIsFocused();
    //console.log('is focused enfant', isFocused)
    onUpdate(isFocused);
    return null
  }