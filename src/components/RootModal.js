import React from 'react'
import {View,Text,Modal} from 'react-native'

// import Modal from 'react-native-modal'

function RootModal({showModal,modalView,...props}) {
    return (
        <Modal visible = {showModal} {...props}>
            <View style={{ flex: 1,backgroundColor:"transparent"}}>
              {modalView}
            </View>
        </Modal>
    )
    
}

export default RootModal