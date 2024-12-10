"Function to retrieve data from an RG in Bubble and convert it into a CSV file."
"The resulting file is uploaded for the user using an EP into the API"

function uploadCSV() {
    // Sample data to be converted to CSV
    const telefono= [RG PreProd All Google places's List of Get Places bodys:each item's formatted_phone_number:formatted as JSON-safe]; //Codigo en bubble

    const empresa = [RG PreProd All Google places's List of Get Places bodys:each item's name:formatted as JSON-safe]; //Codigo en bubble

    const giro_Comercial = "SearchBox Current geographic p's value:capitalized words"; //Codigo en bubble

    const direccion = [RG PreProd All Google places's List of Get Places bodys:each item's formatted_address:formatted as JSON-safe]; //Codigo en bubble

    const data = empresa.map((empresa, index) => ({
        Nombre: "",
        Apellido: "",
        Telefono: telefono[index],
        Email: "",
        Empresa: empresa,
        Giro_Comercial: giro_Comercial,
        Direccion: direccion[index],
    }));

    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", blob, "prospectos.csv");

    const url = "Result of step 5 (Create variables)'s Var 1"; //Codigo en bubble
    const key = "Result of step 5 (Create variables)'s Var 2"; //Codigo en bubble

    const params = new URLSearchParams({
        user_id: "Current User's external_id", //Codigo en bubble
        use_of_file: "2",
    });

    const headersData = {
        'Accept': 'application/json',
        'Authorization': key
    };

    fetch(`${url}${params.toString()}`, {
        method: "POST",
        headers: headersData,
        body: formData 
    })
    .then(response => response.json())
    .then(data => bubble_fn_status("200")) //Funcion para bubble
    .catch(error => bubble_fn_status("500")); //Funcion para bubble

    //To download:
    const urlDL= URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlDL;
    a.download = 'prospectosDL.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(urlDL);
}

function convertToCSV(data) {
    const headers = Object.keys(data[0]); // Get the keys (headers)
    const rows = data.map(row =>
        headers.map(header => `"${row[header]}"`).join(",") // Create rows with values
    );
    return [headers.join(","), ...rows].join("\n"); // Combine headers and rows into CSV
}

uploadCSV();