function DeliveryETA({ eta }) {

  if (!eta) return null

  const date = new Date(eta)

  return (

    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8">

      <p className="text-sm text-green-700 font-medium">
        Estimated Delivery
      </p>

      <p className="text-lg font-semibold text-green-800">

        {date.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric"
        })}

      </p>

    </div>

  )

}

export default DeliveryETA