import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Card, CardItem, Button} from 'native-base';

const Confirm = ({children, visible, onAccept, onDecline, onPress }) => {

  const { containerStyle, textStyle, cardSectionStyle } = styles;
  return (
    <View>
      <Modal
        style={containerStyle}
        visible={visible}
        animationType="slide"
        onRequestClose={() => {}}
        transparent
      >
        <Card style={containerStyle}>
          <CardItem style={{ borderRadius: 5}}>
            <Text>Versi terbaru sudah tersedia, pastikan sebelum menginstall hapus terlebih dahulu versi aplikasi saat ini</Text>

          </CardItem>

          <CardItem>
            <Button
              block
              rounded
              info
              style={{ margin: 10, flex: 1 }}
              onPress={ onPress }
            >
            <Text>Update</Text>
          </Button>
          </CardItem>
        </Card>

      </Modal>
    </View>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    flex: 1,
  }
};

export default Confirm;
