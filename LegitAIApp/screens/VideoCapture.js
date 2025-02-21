import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Pressable, Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const VideoCapture = ({ onClose }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function CustomButton(props) {
    const { onPress, title = 'Capture' } = props;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  }

  const captureAndDetectLogo = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const base64Image = photo.base64;

      try {
        const response = await axios.post(
          'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBsJb_hMEovmMriDhL4_Afs9zj4WVG0fEs',
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'LOGO_DETECTION',
                    maxResults: 10,
                  },
                ],
              },
            ],
          }
        );

        if (response.data.responses[0].logoAnnotations) {
          setAnnotations(response.data.responses[0].logoAnnotations);
        }
      } catch (err) {
        console.error('Error detecting logos: ', err);
      } finally {
        setIsProcessing(false);
      }
    } else {
      console.log('Camera ref is null or processing is in progress');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.overlay}>
          {annotations.map((annotation, index) => (
            <Text key={index} style={styles.annotationText}>
              {annotation.description} ({annotation.score.toFixed(2)})
            </Text>
          ))}
        </View>
      </CameraView>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={captureAndDetectLogo} title="Capture" />
        <CustomButton onPress={toggleCameraFacing} title="Flip" />
        <CustomButton onPress={onClose} title="Close" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
    paddingHorizontal: 10,
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
    bottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  annotationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VideoCapture;
