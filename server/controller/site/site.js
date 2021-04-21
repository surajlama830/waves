const { Site } = require('../../models/Site');

exports.getSiteInfo = (req, res) => {
	Site.find({}, (err, site) => {
		if (err) return res.status(400).send(err);
		res.status(200).send(site[0].siteInfo);
	});
};

exports.postSiteInfo = (req, res) => {
	Site.findOneAndUpdate({ name: 'Site' }, 
	{ $set: { siteInfo: req.body } }, 
	{ new: true }, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.status(200).send({
			success: true,
			siteInfo: doc.siteInfo
		});
	});
};
