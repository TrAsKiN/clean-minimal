function Settings(props) {
  return (
    <Page>
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
    </Page>
  );
}

registerSettingsPage(Settings);
