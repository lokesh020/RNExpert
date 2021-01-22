import React, { Component } from 'react'
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native'

import PropTypes from "prop-types";


class SpinnerModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    show = () => {
        this.setState({isLoading:true})
    }

    hide = () => {
        this.setState({isLoading:false})
    }

    render() {
        const {isLoading} = this.state
        return (
            <Modal visible={isLoading} {...this.props} animationType={"none"} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.loaderCont}>
                        <ActivityIndicator size="large" color="tomato" />
                    </View>
                </View>
            </Modal>
        )
    }
}

export default SpinnerModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    loaderCont: {
        width: 90,
        height: 90,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
    }
})