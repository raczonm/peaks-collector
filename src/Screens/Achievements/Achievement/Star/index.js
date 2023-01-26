import { Image } from 'react-native';
import achievementStar from '../../../../Assets/achievementStar.png';

export default ({ position, color }) => {
    return <Image source={achievementStar} style={{ tintColor: color, position: 'absolute', width: 12, height: 12, ...position }} />
};
           