module.exports = {
  index: (req, res) => {
    res.render('admin/index', { title: 'Dashboard Page', breadcrumb: 'Admin Dashboard', data: '' });
  },
  
}