const mappingProfile = {
  'Subsidiary org': {
    Subsidiary: '- Default user access\n- Requested R/S (subsidiary only)',
    RHQ: '- Default user access\n- Requested R/S (subsidiaries)',
    HQ: '- Default user access\n- All P4 Report Access\n- All_EPP\n- MST global\n- USA',
  },
  'RHQ org': {
    Subsidiary:
      '- Ad Hoc Analysis License Users\n- Analysis Workspace Access\n- Current Data Users\n- Reports and Analytics Accesses\n- Report Builder\n- Requested R/S (subsidiary)',
    RHQ: '- Ad Hoc Analysis License Users\n- Analysis Workspace Access\n- Current Data Users\n- Reports and Analytics Accesses\n- Report Builder\n- Requested R/S (Region or subsidiary)\n- (Or) All Report Access',
    HQ: '- Ad Hoc Analysis License Users\n- Analysis Workspace Access\n- Current Data Users\n- Reports and Analytics Accesses\n- Report Builder\n- Requested R/S (Region or subsidiary)\n- (Or) All Report Access',
  },
  'Samsung org': {
    Subsidiary: '- Default user access\n- Requested R/S (subsidiary)',
    RHQ: '- Default user access\n- Requested R/S (Multiple Subsidiaries) (ie. Europe)',
    HQ: '- Default user access\n- All P4 Report Access\n- All_EPP\n- MST global\n- USA',
  },
  'Samsung Europe Retargeting Org': {
    Subsidiary:
      '- Analysis Workspace ( Default User Access with Report Suite: Germany, Spain, UK)',
    RHQ: '-Reports & Analytics Access\n- Analysis Workspace\nAll Report Access',
    HQ: '-Reports & Analytics Access\n- Analysis Workspace\nAll Report Access',
  },
};

module.exports = { mappingProfile };
