function mySettings(props) {
  return (
    <Page>
      <Section title="Color">
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: '#ffffff'},
            {color: '#dadada'},
            {color: '#b7b7b7'},
            {color: '#949494'},
            {color: '#737373'},
            {color: '#545454'},

            {color: '#ff4c4c'},
            {color: '#e74343'},
            {color: '#cf3b3b'},
            {color: '#b83333'},
            {color: '#a22b2b'},
            {color: '#8c2323'},

            {color: '#87ceeb'},
            {color: '#68b2dd'},
            {color: '#5196cd'},
            {color: '#4579bb'},
            {color: '#445ca5'},
            {color: '#483d8b'},

            {color: '#8fbc8f'},
            {color: '#82ab7b'},
            {color: '#769b67'},
            {color: '#6b8b54'},
            {color: '#607b41'},
            {color: '#556b2f'},

            {color: '#ff78b7'},
            {color: '#f067a7'},
            {color: '#e15597'},
            {color: '#d14387'},
            {color: '#c22f77'},
            {color: '#b31468'},

            {color: '#ffdb33'},
            {color: '#fdc524'},
            {color: '#faaf19'},
            {color: '#f59913'},
            {color: '#ee8313'},
            {color: '#e66d17'},
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
