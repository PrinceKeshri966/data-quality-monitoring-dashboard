import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, Database, Activity, Settings, Bell, Play, Code, MessageSquare, Calendar } from 'lucide-react';

const DataQualityMonitoringSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDataset, setSelectedDataset] = useState('users');
  const [pipelineStatus, setPipelineStatus] = useState('running');

  // Great Expectations validation results
  const validationResults = {
    users: {
      name: 'Users Table',
      totalExpectations: 12,
      successfulExpectations: 10,
      successRate: 83.3,
      lastRun: '2024-01-07 06:15:23',
      status: 'warning',
      failures: [
        { expectation: 'expect_column_values_to_match_regex', column: 'email', details: '156 invalid email formats found' },
        { expectation: 'expect_column_values_to_be_unique', column: 'user_id', details: '23 duplicate user IDs detected' }
      ]
    },
    products: {
      name: 'Products Table', 
      totalExpectations: 8,
      successfulExpectations: 8,
      successRate: 100,
      lastRun: '2024-01-07 06:12:45',
      status: 'success',
      failures: []
    },
    orders: {
      name: 'Orders Table',
      totalExpectations: 10,
      successfulExpectations: 7,
      successRate: 70,
      lastRun: '2024-01-07 06:18:12',
      status: 'critical',
      failures: [
        { expectation: 'expect_column_values_to_be_between', column: 'total_amount', details: '45 orders with negative amounts' },
        { expectation: 'expect_column_values_to_not_be_null', column: 'user_id', details: '89 orders with missing user IDs' },
        { expectation: 'expect_column_values_to_be_unique', column: 'order_id', details: '12 duplicate order IDs' }
      ]
    }
  };

  // Airflow DAG runs history
  const dagRuns = [
    { date: '2024-01-07', status: 'success', duration: '4m 23s', issues: 2 },
    { date: '2024-01-06', status: 'success', duration: '3m 45s', issues: 1 },
    { date: '2024-01-05', status: 'failed', duration: '2m 12s', issues: 5 },
    { date: '2024-01-04', status: 'success', duration: '4m 01s', issues: 0 },
    { date: '2024-01-03', status: 'success', duration: '3m 52s', issues: 1 },
    { date: '2024-01-02', status: 'success', duration: '4m 15s', issues: 3 },
    { date: '2024-01-01', status: 'success', duration: '3m 58s', issues: 2 }
  ];

  // Slack alerts data
  const slackAlerts = [
    { id: 1, type: 'critical', message: 'CRITICAL: Data quality check failed for orders. Success rate: 70.0% (7/10)', time: '06:18', dataset: 'orders' },
    { id: 2, type: 'warning', message: 'WARNING: Data quality issues detected in users. Success rate: 83.3% (10/12)', time: '06:15', dataset: 'users' },
    { id: 3, type: 'info', message: 'SUCCESS: Data quality check passed for products. Success rate: 100.0%', time: '06:12', dataset: 'products' },
    { id: 4, type: 'info', message: 'Daily Data Quality Report generated successfully', time: '06:30', dataset: 'report' }
  ];

  // Quality trends over time
  const qualityTrends = [
    { date: '2024-01-01', users: 85, products: 98, orders: 78 },
    { date: '2024-01-02', users: 87, products: 99, orders: 82 },
    { date: '2024-01-03', users: 84, products: 97, orders: 75 },
    { date: '2024-01-04', users: 89, products: 100, orders: 85 },
    { date: '2024-01-05', users: 86, products: 98, orders: 68 },
    { date: '2024-01-06', users: 88, products: 100, orders: 72 },
    { date: '2024-01-07', users: 83, products: 100, orders: 70 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Pipeline Status */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Airflow Pipeline Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Running</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">data_quality_monitoring</div>
            <div className="text-sm text-gray-500">DAG Name</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Daily 6:00 AM</div>
            <div className="text-sm text-gray-500">Schedule</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">4m 23s</div>
            <div className="text-sm text-gray-500">Last Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-500">Issues Found</div>
          </div>
        </div>
      </div>

      {/* Great Expectations Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(validationResults).map(([key, result]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{result.name}</h3>
              {getStatusIcon(result.status)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className={`font-bold ${getStatusColor(result.status)}`}>
                  {result.successRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expectations</span>
                <span className="font-semibold">{result.successfulExpectations}/{result.totalExpectations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Failures</span>
                <span className="font-semibold text-red-500">{result.failures.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Run</span>
                <span className="font-semibold text-xs">{result.lastRun}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Quality Trends (7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={qualityTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" strokeWidth={2} />
            <Line type="monotone" dataKey="products" stroke="#82ca9d" name="Products" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="#ffc658" name="Orders" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Slack Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Slack Alerts</h3>
          <MessageSquare className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-3">
          {slackAlerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
              alert.type === 'critical' ? 'border-red-500 bg-red-50' :
              alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {alert.type === 'critical' ? <XCircle className="w-4 h-4 text-red-500" /> :
                     alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> :
                     <CheckCircle className="w-4 h-4 text-blue-500" />}
                    <span className="font-medium text-sm">{alert.message}</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    #{alert.dataset} • {alert.time} • Sent to #data-quality-alerts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAirflowDetails = () => (
    <div className="space-y-6">
      {/* DAG Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">DAG Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-700 overflow-x-auto">
{`dag = DAG(
    'data_quality_monitoring',
    default_args=default_args,
    description='Data Quality Monitoring Pipeline using Great Expectations',
    schedule_interval='0 6 * * *',  # Run daily at 6 AM
    max_active_runs=1,
    catchup=False,
    tags=['data-quality', 'monitoring', 'great-expectations']
)`}
          </pre>
        </div>
      </div>

      {/* DAG Run History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">DAG Run History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Issues Found</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dagRuns.map((run, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-mono text-sm">{run.date}</td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(run.status)}
                      <span className={`capitalize font-medium ${getStatusColor(run.status)}`}>
                        {run.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-sm">{run.duration}</td>
                  <td className="py-3">
                    <span className={`font-semibold ${run.issues > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {run.issues}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-500 hover:text-blue-700 text-sm">View Logs</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Dependencies */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Task Dependencies</h3>
        <div className="flex items-center justify-center space-x-4 p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              Setup
            </div>
            <div className="text-sm text-gray-600">setup_expectation_suites</div>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              Val
            </div>
            <div className="text-sm text-gray-600">validate_users</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              Val
            </div>
            <div className="text-sm text-gray-600">validate_products</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              Val
            </div>
            <div className="text-sm text-gray-600">validate_orders</div>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
              Rep
            </div>
            <div className="text-sm text-gray-600">generate_daily_report</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpectations = () => {
    const dataset = validationResults[selectedDataset];
    
    const expectationTypes = [
      { name: 'Column Existence', count: 3, description: 'expect_column_to_exist' },
      { name: 'Uniqueness', count: 2, description: 'expect_column_values_to_be_unique' },
      { name: 'Null Checks', count: 4, description: 'expect_column_values_to_not_be_null' },
      { name: 'Format Validation', count: 2, description: 'expect_column_values_to_match_regex' },
      { name: 'Range Validation', count: 1, description: 'expect_column_values_to_be_between' }
    ];

    return (
      <div className="space-y-6">
        {/* Dataset Selector */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select Dataset</h3>
          <div className="flex space-x-4">
            {Object.entries(validationResults).map(([key, result]) => (
              <button
                key={key}
                onClick={() => setSelectedDataset(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDataset === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {result.name}
              </button>
            ))}
          </div>
        </div>

        {/* Expectation Suite Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Expectation Suite: {dataset.name}</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon(dataset.status)}
              <span className={`font-medium ${getStatusColor(dataset.status)}`}>
                {dataset.successRate}% Success Rate
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Expectation Types</h4>
              <div className="space-y-2">
                {expectationTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{type.description}</div>
                    </div>
                    <div className="font-bold text-blue-600">{type.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Validation Failures</h4>
              {dataset.failures.length > 0 ? (
                <div className="space-y-2">
                  {dataset.failures.map((failure, index) => (
                    <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="font-medium text-red-800">{failure.column}</div>
                      <div className="text-sm text-red-600 font-mono">{failure.expectation}</div>
                      <div className="text-sm text-red-700 mt-1">{failure.details}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-green-50 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <div className="text-green-700 font-medium">All expectations passed!</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sample Great Expectations Code */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sample Great Expectations Code</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`# Great Expectations validation for ${selectedDataset}
suite.add_expectation(
    expectation_configuration={
        "expectation_type": "expect_column_values_to_be_unique",
        "kwargs": {"column": "${selectedDataset}_id"}
    }
)

suite.add_expectation(
    expectation_configuration={
        "expectation_type": "expect_column_values_to_not_be_null",
        "kwargs": {"column": "created_at"}
    }
)

# Run validation
results = checkpoint.run()
success_rate = results.statistics['successful_expectations'] / results.statistics['evaluated_expectations']`}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Data Quality Monitor</h1>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Great Expectations + Airflow
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Pipeline Active</span>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'airflow', label: 'Airflow Pipeline', icon: Play },
              { id: 'expectations', label: 'Great Expectations', icon: Code }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'airflow' && renderAirflowDetails()}
        {activeTab === 'expectations' && renderExpectations()}
      </div>
    </div>
  );
};

export default DataQualityMonitoringSystem;