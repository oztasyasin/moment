import React from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Label from './label/Label';
import Row from './row/Row';
const EmptyData = () => {
    return (
        <View style={{ flex: 1 }}>
            <Row
                vertical
                center
                start>
                <MaterialCommunityIcons
                    style={{ marginTop: 100 }}
                    name="database-off"
                    size={70}
                    color="black" />
                <Label
                    mt={24}
                    text={"No Data!!"}
                    font={[600, 24, 22]} />
                <Label
                    mt={16}
                    style={{maxWidth:'55%',textAlign:'center'}}
                    text={"There seems to be no data here. Please try again later"}
                    font={[400, 16, 20]} />
            </Row>

        </View>
    )
}

export default EmptyData