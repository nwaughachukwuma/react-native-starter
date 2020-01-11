import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { withTheme } from 'react-native-paper'

declare var global: { HermesInternal: null | {} };
type Props = {
    theme: { colors: any }
}

const App: React.FC<Props> = (props) => {

    const {
        theme: { colors }
    } = props

    console.log
    return (
        <>
            {/* <StatusBar barStyle="dark-content" /> */}
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles(colors).scrollView}>
                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={styles(colors).engine}>
                            <Text style={styles(colors).footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles(colors).body}>
                        <View style={styles(colors).sectionContainer}>
                            <Text style={styles(colors).sectionTitle}>Step One</Text>
                            <Text style={styles(colors).sectionDescription}>
                                Edit <Text style={styles(colors).highlight}>App.tsx</Text> to change
                                this screen and then come back to see your edits.
                            </Text>
                        </View>
                        <View style={styles(colors).sectionContainer}>
                            <Text style={styles(colors).sectionTitle}>See Your Changes</Text>
                            <Text style={styles(colors).sectionDescription}>
                                <ReloadInstructions />
                            </Text>
                        </View>
                        <View style={styles(colors).sectionContainer}>
                            <Text style={styles(colors).sectionTitle}>Debug</Text>
                            <Text style={styles(colors).sectionDescription}>
                                <DebugInstructions />
                            </Text>
                        </View>
                        <View style={styles(colors).sectionContainer}>
                            <Text style={styles(colors).sectionTitle}>Learn More</Text>
                            <Text style={styles(colors).sectionDescription}>
                                Read the docs to discover what to do next:
                            </Text>
                        </View>
                        <LearnMoreLinks />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = (colors: any) => StyleSheet.create({
    scrollView: {
        backgroundColor: colors.surface, // Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: colors.background, // Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.text, // Colors.black
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: colors.lightText, // Colors.dark
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: colors.text, // Colors.dark
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

// @ts-ignore
export default withTheme(App);