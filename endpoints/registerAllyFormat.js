import db from "../db/knex.js";


const registerAllyFormat = async (req, res) => {
  // Destructure ALL fields from the form
  const {
    // Moral Person
    orgName, giro, orgPurpose, orgAddress, orgPhone, orgWeb,
    // Public Scripture
    psNumber, psDate, notaryName, city,
    // Tax Certificate
    rfc, socialReason, regimen, taxAddress,
    // Representative
    representativeName, representativeAddress, representativePhone, area,
    // Natural Person
    npName, npEmail, npPhone, npCURP, npInstitution, npReason
  } = req.body;

  // Validate required fields
  if (!orgName || !rfc || !npName || !npEmail || !representativeName) {
    return res.status(400).json({ 
      success: false,
      message: "Missing required fields: orgName, rfc, npName, npEmail, and representativeName are mandatory" 
    });
  }

  try {
    // Start transaction
    const result = await db.transaction(async (trx) => {
      // 1. Insert moral_person
      const [moralPerson] = await trx("moral_person")
        .insert({
          orgName,
          giro,
          orgPurpose,
          orgAddress,
          orgPhone,
          orgWeb
        })
        .returning("moralPersonID");

      // 2. Insert public_scripture
      const [publicScripture] = await trx("public_scripture")
        .insert({
          psNumber,
          psDate,
          notaryName,
          city
        })
        .returning("publicScriptureID");

      // 3. Insert tax_certificate
      const [taxCertificate] = await trx("tax_certificate")
        .insert({
          rfc,
          socialReason,
          regimen,
          taxAddress
        })
        .returning("taxCertificateID");

      // 4. Insert representative
      const [representative] = await trx("representative")
        .insert({
          representativeName,
          representativeAddress,
          representativePhone,
          area
        })
        .returning("representativeID");

      // 5. Insert natural_person
      const [naturalPerson] = await trx("natural_person")
        .insert({
          npName,
          npEmail,
          npPhone,
          npCURP,
          npInstitution,
          npReason
        })
        .returning("naturalPersonID");

      // 6. Create relationship in ally_format
      const [allyFormat] = await trx("ally_format")
        .insert({
          moralPersonID: moralPerson.moralPersonID,
          publicScriptureID: publicScripture.publicScriptureID,
          taxCertificateID: taxCertificate.taxCertificateID,
          representativeID: representative.representativeID,
          naturalPersonID: naturalPerson.naturalPersonID
        })
        .returning("*");

      return allyFormat;
    });

    return res.status(201).json({
      success: true,
      message: "Ally registered successfully",
      data: result
    });

  } catch (error) {
    console.error("Transaction failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register ally - transaction rolled back",
      error: error.message
    });
  }
};

export default registerAllyFormat;