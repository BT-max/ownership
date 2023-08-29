import { DataGrid } from '@mui/x-data-grid'

const data = {
  'Major Holders': {
    Breakdown: [
      {
        percentage: '0.05%',
        description: '% of Shares Held by All Insider',
      },
      {
        percentage: '73.21%',
        description: '% of Shares Held by Institutions',
      },
      {
        percentage: '73.25%',
        description: '% of Float Held by Institutions',
      },
      {
        percentage: '6,255',
        description: 'Number of Institutions Holding Shares',
      },
    ],
    'Top Institutional Holders': [
      {
        holder: 'Vanguard Group Inc',
        shares: '649,544,303',
        date_reported: 'Mar 30, 2023',
        percentage_out: '8.74%',
        value: '212,323,044,936',
      },
      {
        holder: 'Blackrock Inc.',
        shares: '537,573,096',
        date_reported: 'Mar 30, 2023',
        percentage_out: '7.24%',
        value: '175,721,896,245',
      },
      {
        holder: 'State Street Corporation',
        shares: '292,106,885',
        date_reported: 'Mar 30, 2023',
        percentage_out: '3.93%',
        value: '95,483,899,995',
      },
      {
        holder: 'FMR, LLC',
        shares: '200,523,373',
        date_reported: 'Mar 30, 2023',
        percentage_out: '2.70%',
        value: '65,547,081,145',
      },
      {
        holder: 'Price (T.Rowe) Associates Inc',
        shares: '166,035,734',
        date_reported: 'Mar 30, 2023',
        percentage_out: '2.23%',
        value: '54,273,761,540',
      },
      {
        holder: 'Geode Capital Management, LLC',
        shares: '144,365,760',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.94%',
        value: '47,190,280,333',
      },
      {
        holder: 'Morgan Stanley',
        shares: '120,316,895',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.62%',
        value: '39,329,187,225',
      },
      {
        holder: 'JP Morgan Chase & Company',
        shares: '94,617,741',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.27%',
        value: '30,928,647,640',
      },
      {
        holder: 'Capital World Investors',
        shares: '87,608,980',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.18%',
        value: '28,637,623,810',
      },
      {
        holder: 'Norges Bank Investment Management',
        shares: '86,316,926',
        date_reported: 'Dec 30, 2022',
        percentage_out: '1.16%',
        value: '28,215,277,192',
      },
    ],
    'Top Mutual Fund Holders': [
      {
        holder: 'Vanguard Total Stock Market Index Fund',
        shares: '226,594,602',
        date_reported: 'Dec 30, 2022',
        percentage_out: '3.04%',
        value: '74,069,244,608',
      },
      {
        holder: 'Vanguard 500 Index Fund',
        shares: '172,326,589',
        date_reported: 'Dec 30, 2022',
        percentage_out: '2.32%',
        value: '56,330,116,253',
      },
      {
        holder: 'Fidelity 500 Index Fund',
        shares: '81,720,092',
        date_reported: 'Feb 27, 2023',
        percentage_out: '1.10%',
        value: '26,712,664,071',
      },
      {
        holder: 'SPDR S&P 500 ETF Trust',
        shares: '80,591,530',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.08%',
        value: '26,343,759,719',
      },
      {
        holder: 'Invesco ETF Tr-Invesco QQQ Tr, Series 1 ETF',
        shares: '75,130,340',
        date_reported: 'Mar 30, 2023',
        percentage_out: '1.01%',
        value: '24,558,605,906',
      },
      {
        holder: 'iShares Core S&P 500 ETF',
        shares: '66,532,494',
        date_reported: 'Feb 27, 2023',
        percentage_out: '0.89%',
        value: '21,748,141,963',
      },
      {
        holder: 'Vanguard Growth Index Fund',
        shares: '62,920,006',
        date_reported: 'Dec 30, 2022',
        percentage_out: '0.85%',
        value: '20,567,291,868',
      },
      {
        holder: 'Vanguard Institutional Index Fund-Institutional Index Fund',
        shares: '52,237,514',
        date_reported: 'Dec 30, 2022',
        percentage_out: '0.70%',
        value: '17,075,398,831',
      },
      {
        holder: 'Growth Fund Of America Inc',
        shares: '41,256,784',
        date_reported: 'Mar 30, 2023',
        percentage_out: '0.55%',
        value: '13,486,017,755',
      },
      {
        holder: 'Vanguard Information Technology Index Fund',
        shares: '34,018,479',
        date_reported: 'Nov 29, 2022',
        percentage_out: '0.46%',
        value: '11,119,960,581',
      },
    ],
  },
}

function DataTable() {
  // Process your data here...
  const breakdownColumns = [
    { field: 'percentage', headerName: 'Percentage', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
  ]

  const breakdownRows = data['Major Holders']['Breakdown'].map(
    (item, index) => ({
      id: index,
      percentage: item.percentage,
      description: item.description,
    }),
  )

  const holdersColumns = [
    { field: 'holder', headerName: 'Holder', width: 200 },
    { field: 'shares', headerName: 'Shares', width: 200 },
    { field: 'date_reported', headerName: 'Date Reported', width: 200 },
    { field: 'percentage_out', headerName: '% Out', width: 100 },
    { field: 'value', headerName: 'Value', width: 200 },
  ]

  const institutionalHoldersRows = data['Major Holders'][
    'Top Institutional Holders'
  ].map((item, index) => ({
    id: index,
    ...item,
  }))

  const mutualFundHoldersRows = data['Major Holders'][
    'Top Mutual Fund Holders'
  ].map((item, index) => ({
    id: index,
    ...item,
  }))

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Breakdown</h1>
      <DataGrid rows={breakdownRows} columns={breakdownColumns} pageSize={5} />
      <h1>Top Institutional Holders</h1>
      <DataGrid
        rows={institutionalHoldersRows}
        columns={holdersColumns}
        pageSize={5}
      />
      <h1>Top Mutual Fund Holders</h1>
      <DataGrid
        rows={mutualFundHoldersRows}
        columns={holdersColumns}
        pageSize={5}
      />
    </div>
  )
}

export default DataTable
