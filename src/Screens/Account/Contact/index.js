import Description from '../../../Components/Account/Description';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';
import WebLink from '../../../Components/WebLink';

export default () => {
    return <ScrollWrapper isLoading={false} formMessage={{}} withHeader={true}>
        <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet ex ac ultricies consectetur. Proin eget nisl eget sem pellentesque mollis. Donec pharetra leo nisi, luctus rutrum felis consequat quis. Sed sodales diam dictum felis hendrerit, sed gravida nisl vestibulum</Description>
        <Description>You can get in touch with  us directly by mailing to <WebLink href="mailto:contact@peakscollector.app<">contact@peakscollector.app</WebLink> or through any social media channel. We love to stay in touch with our users!</Description>
    </ScrollWrapper>;
};