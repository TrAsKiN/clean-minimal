function mySettings(props) {
  return (
    <Page>
      <Section title="Color">
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: 'white'},
            {color: 'darkgray'},
            {color: 'dimgray'},
            {color: 'red'},
            {color: 'steelblue'},
            {color: 'seagreen'},
            {color: 'deeppink'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
